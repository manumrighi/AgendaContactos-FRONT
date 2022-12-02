import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-agregar-editar-contacto',
  templateUrl: './agregar-editar-contacto.component.html',
  styleUrls: ['./agregar-editar-contacto.component.scss']
})
export class AgregarEditarContactoComponent implements OnInit {
  agregarContact: FormGroup;
  accion = 'Agregar';
  id = 0;
  contacto: Contact | undefined;

  constructor(private fb: FormBuilder,
              private _contactService: ContactService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.agregarContact = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if(this.id !==0) {
      this.accion = 'Editar'
      this._contactService.getContact(this.id).subscribe(data => {
        console.log(data);
        this.contacto = data;
        this.agregarContact.patchValue({
          name: data.name,
          number: data.number,
          email: data.email,
        })
      }, error => {
        console.log(error);
      })
    }
  }


  agregarEditarContacto() {

    // Agregamos un nuevo contacto
    if(this.contacto == undefined) {
      const contactos: Contact = {
        name: this.agregarContact.get('name')?.value,
        number: this.agregarContact.get('number')?.value,
        email: this.agregarContact.get('email')?.value,
      }
      this._contactService.saveContact(contactos).subscribe(data => {
        this.router.navigate(['/contact/']); 
      }, error => {
        console.log(error);
      })
    } else {

      // Editamos contacto
      const contactos: Contact = {
        id: this.contacto.id, 
        name: this.agregarContact.get('name')?.value,
        number: this.agregarContact.get('number')?.value,
        email: this.agregarContact.get('email')?.value,
      }

      this._contactService.updateContact(this.id, contactos).subscribe(data => {
        this.router.navigate(['/contact/'])
      }, error => {
        console.log(error); 
      })
    }

    
  }
}
