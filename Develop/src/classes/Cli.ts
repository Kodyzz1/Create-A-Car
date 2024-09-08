// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well | Done
  // TODO: You will need to use the Union operator to define additional types for the array | Done
  // TODO: See the AbleToTow interface for an example of how to use the Union operator | Done
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well | Done
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
    chooseVehicle(): void {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'selectedVehicleVin',
            message: 'Select a vehicle to perform an action on',
            choices: this.vehicles.map((vehicle) => {
              let name = '';
              if ('vin' in vehicle && (vehicle instanceof Car || vehicle instanceof Truck || vehicle instanceof Motorbike)) {
                const carOrTruckOrMotorbike = vehicle as Car | Truck | Motorbike;
                name = `${carOrTruckOrMotorbike.vin} -- ${carOrTruckOrMotorbike.make} ${carOrTruckOrMotorbike.model}`;
                return {
                  name: name,
                  value: carOrTruckOrMotorbike.vin,
                };
              }
              return null;
            }).filter(Boolean),
          },
        ])
        .then((answers) => {
          // set the selectedVehicleVin to the vin of the selected vehicle
          this.selectedVehicleVin = answers.selectedVehicleVin;
          // perform actions on the selected vehicle
          for (const vehicle of this.vehicles) {
            if ('vin' in vehicle && vehicle.vin === this.selectedVehicleVin) {
              vehicle.printDetails();
            }
          }
          this.performActions();
        });
    }

  // method to create a vehicle
    createVehicle(): void {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'vehicleType',
            message: 'Select a vehicle type',
            // TODO: Update the choices array to include Truck and Motorbike | Done
            choices: ['Car', 'Truck', 'Motorbike'],
          },
        ])
        .then((answers) => {
          if (answers.vehicleType === 'Car') {
            // create a car
            this.createCar();
          } else if (answers.vehicleType === 'Truck') {
            // create a truck
            this.createTruck();
          } else if (answers.vehicleType === 'Motorbike') {
            // create a motorbike
            this.createMotorbike();
          }
        });
    }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt<Record<string, string>>([
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
      ])
      .then((answers: Record<string, string>) => {
      const car: Car = new Car(
        Cli.generateVin(),
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        []
      );
      this.vehicles.push(car);
      this.selectedVehicleVin = car.vin;
      this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt<Record<string, string>>([
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
      {
        type: 'input',
        name: 'towingCapacity',
        message: 'Enter Towing Capacity',
      },
      ])
      .then((answers: Record<string, string>) => {
      const truck: Truck = new Truck(
        Cli.generateVin(),
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.towingCapacity),
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        parseInt(answers.towingCapacity)
      );
      // push the truck to the vehicles array
      this.vehicles.push(truck);
      // set the selectedVehicleVin to the vin of the truck
      this.selectedVehicleVin = truck.vin;
      // perform actions on the truck
      this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const motorbike: Motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          {
            frontWheelDiameter: parseInt(answers.frontWheelDiameter),
            frontWheelBrand: answers.frontWheelBrand,
            rearWheelDiameter: parseInt(answers.rearWheelDiameter),
            rearWheelBrand: answers.rearWheelBrand
          }
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers) => {
        // check if the selected vehicle is the truck
        if (answers.vehicleToTow instanceof Truck) {
          console.log("The truck cannot tow itself.");
          this.performActions();
        } else {
          // tow the selected vehicle
          const selectedVehicle = answers.vehicleToTow;
          const truck = this.vehicles.find((vehicle) => vehicle instanceof Truck);
          if (truck) {
            truck.tow(selectedVehicle);
          }
          this.performActions();
        }
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          // TODO: add options to tow and wheelie
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Exit',
            'tow',
            'wheelie',
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (const element of this.vehicles) {
            if ('vin' in element && element.vin === this.selectedVehicleVin) {
              element.printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.reverse();
            }
          }
          else if (answers.action === 'tow') {
            for (const element of this.vehicles) {
              if (element.vin === this.selectedVehicleVin) {
                element.tow();
              }
            }
        }
        // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
        // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
        else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
