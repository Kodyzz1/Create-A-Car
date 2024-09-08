// Importing Vehicle and Wheel classes
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";

// TODO: The Motorbike class should extend the Vehicle class
class Motorbike extends Vehicle {
  // TODO: Declare properties of the Motorbike class |Done
  vin: string = "";
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  // TODO: The properties should include vin, color, make, model, year, weight, top speed, and wheels |Done
  // TODO: The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[]) |Done

  // Create a constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
      // Call the constructor of the parent class, Vehicle
      super();
  
      // Initialize the properties of the Motorbike class
      this.vin = vin;
      this.color = color;
      this.make = make;
      this.model = model;
      this.year = year;
      this.weight = weight;
      this.topSpeed = topSpeed;
      this.wheels = wheels;
  
      // Check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not
      if (this.wheels.length !== 2) {
        while (this.wheels.length < 2) {
          this.wheels.push(new Wheel());
        // Remove the extra closing brace
      }
    }

    // Check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not
    if (this.wheels.length !== 2) {
      while (this.wheels.length < 2) {
        this.wheels.push(new Wheel());
      }
    }
  }

  // Implement the wheelie method
  wheelie() {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }
  // Override the printDetails method from the Vehicle class
  override printDetails() {
    // Call the printDetails method of the parent class
    super.printDetails();
    
    // Log the details of the Motorbike
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Top Speed: ${this.topSpeed}`);
    console.log(`Color: ${this.color}`);
    console.log(`Wheels: ${this.wheels}`);
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
