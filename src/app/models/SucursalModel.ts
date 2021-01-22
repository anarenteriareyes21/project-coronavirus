export class SucursalModel{
    id: string;
    name: string
    location: string
    tel: string;
    state: string;
    products= {
        sanitizer: false,
        mask: false,
        oxygen: false
    }
    
}