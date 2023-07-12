import { model } from "mongoose";

let cars = [
    { model : "Toyota", make : "camry", color : "black", year: 2020, price: 24000 },
    { model : "Honda", make : "acord", color : "brown", year: 2021, price: 26000 },
    { model : "Altima", make : "nissan", color : "white", year: 2018, price: 17000 },
    { model : "MX-5", make : "mazda", color : "blue", year: 2022, price: 29000 },
    { model : "X5", make : "bmw", color : "red", year: 2015, price: 12000 }
    
];




function getAll() {
  return cars;
}


function  getItem () {
  return cars.find(cars => cars.model === model)  
}
  




export { getAll, getItem };