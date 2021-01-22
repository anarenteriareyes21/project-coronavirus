import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentReference, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpresaModel } from '../models/EmpresaModel';
import { SucursalModel } from '../models/SucursalModel';
import { UsuarioModel } from '../models/UsuarioModel';
import { estados } from '../data/estados.js'


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private EmpresasCollection: AngularFirestoreCollection;
  private SucursalesCollection: AngularFirestoreCollection;
  private empresas: Observable<EmpresaModel[]>;
  private sucursales: Observable<SucursalModel[]>;
  private proveedores: Observable<SucursalModel[]>;
  public documentRef = "";
  private estados =  estados;
  

  constructor(public auth: AngularFireAuth,
    public fs: AngularFirestore) {
    this.EmpresasCollection = this.fs.collection('empresas');
    this.empresas = this.EmpresasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as EmpresaModel;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  // ============= SIGNUP/SIGNIN/OUT =================== //
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  signOut() {
    this.auth.signOut;
  }


  //=============================== CRUD ============================= //
  // ----------------- CREATE -----------------//
  addEnterprise(usuario: UsuarioModel){
    this.EmpresasCollection.doc(`${usuario.id}`).set({
      'userID': usuario.id,
      'userName': usuario.username,
      'email': usuario.email
    }).then(credential => {
      console.log('usuario creado en bd');
      console.log(credential);
    })
      .catch(console.error);
  }
  addSucursal(sucursal: SucursalModel, docRef: string) {
    this.fs.collection(`empresas/${docRef}/sucursales`).add({ ...sucursal })
      .then(credential => {
        console.log('sucursal agregada')
      })
      .catch(console.error);
  }

  // -------------------------- READ --------------------- //
  getEnterprises(docRef: string) {
    return this.fs.collection('empresas').doc(docRef).valueChanges();
  }

  getSucursales(docRef: string) {
    this.SucursalesCollection = this.fs.collection(`empresas/${docRef}/sucursales`);
    this.sucursales = this.SucursalesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as SucursalModel
        data.id = a.payload.doc.id;
        return data;
      })
    }))
    return this.sucursales;
  }

  getSucursal(docRef: string, sucID : string){
   return this.fs.collection(`empresas/${docRef}/sucursales`).doc(sucID).valueChanges();
  }

  getSucursalByProduct(productName : string , stateName: string){
    this.proveedores = this.fs.collectionGroup('sucursales', ref => ref.where(`products.${productName}`,'==', true).where('state','==',`${stateName}`)).snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SucursalModel;
          // console.log('here',data);
          return data;
        })
      }));
      return this.proveedores;
  
    
  }

  // ------------------------ UPDATE ---------------------------- //
  
  updateSucursal(docRef: string, sucursal : SucursalModel){
    this.fs.doc(`empresas/${docRef}/sucursales/${sucursal.id}`).update({...sucursal})
    .then(cr => console.log('actualizado'))
    .catch(console.error);
  }
  

  // ------------------------- DELETE ----------------------------// 
  deleteSucursal(docRef: string, sucursal : SucursalModel){
      this.fs.doc(`empresas/${docRef}/sucursales/${sucursal.id}`).delete()
        .then(cr => console.log('borrado'))
        .catch(console.error);
  }

  // ------------------------- INFO TOOLS ----------------------- //
  getEstados(){
    return this.estados;
  }

}
