import { Component } from '@angular/core';
import { EmployeeModel } from '../../model/Employee';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {

  employeeForm: FormGroup = new FormGroup({});
  emplModel: EmployeeModel = new EmployeeModel;
  EmplList:EmployeeModel[] = [];

  constructor(){
    this.createFrom();
    const data = localStorage.getItem("EmpData");
    if(data != null){
      const parseData = JSON.parse(data);
      this.EmplList = parseData;
    }
  }

  createFrom(){
    this.employeeForm=new FormGroup({
      name : new FormControl(this.emplModel.name, [Validators.required]),
      emailId : new FormControl(this.emplModel.emailId),
      empId : new FormControl(this.emplModel.empId),
      city : new FormControl(this.emplModel.city),
      pinCode : new FormControl(this.emplModel.pinCode),
      address : new FormControl(this.emplModel.address),
      state : new FormControl(this.emplModel.state),
      contactNo : new FormControl(this.emplModel.contactNo),

    })
  }

  saveData(){
    debugger;
    const data = localStorage.getItem("EmpData");
    if(data != null){
      const parseData = JSON.parse(data);
      this.employeeForm.controls['empId'].setValue(parseData.lenght +1);
      this.EmplList.unshift(this.employeeForm.value);
    }else{
      this.EmplList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.EmplList));
    this.restForm();
  }

  updateData(){
    const record = this.EmplList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
    if(record!=undefined){
      record.address=this.employeeForm.controls['address'].value;
      record.name=this.employeeForm.controls['name'].value;
      record.contactNo=this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem('EmpData',JSON.stringify(this.EmplList));
    this.restForm();
  }
 
    edit(item: EmployeeModel) {
   
      this.emplModel = item;
      this.createFrom();

    }

    deleteItem(id : number) {
      const isDelete = confirm("Are you sure want to delete");
      if(isDelete){
        const index = this.EmplList.findIndex(m=>m.empId==id);
        this.EmplList.splice(index, 1);
      }
      localStorage.setItem('EmpData',JSON.stringify(this.EmplList));
      }

      restForm(){
        this.emplModel = new EmployeeModel;
        this.createFrom();
      }


}
