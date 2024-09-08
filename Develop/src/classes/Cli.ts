// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: Array<Car | Truck | Motorbike>;
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: Array<Car | Truck | Motorbike>) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            let name = '';
            if (
              'vin' in vehicle &&
              (vehicle instanceof Car ||
                vehicle instanceof Truck ||
                vehicle instanceof Motorbike)
            ) {
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
        this.selectedVehicleVin = answers.selectedVehicleVin;
        for (const vehicle of this.vehicles) {
          if ('vin' in vehicle && vehicle.vin === this.selectedVehicleVin) {
            vehicle.printDetails();
          }
        }
        this.performActions();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
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
      ])
      .then((answers) => {
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

  createTruck(): void {
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
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const truck: Truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

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
          []
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles
            .filter((vehicle) => vehicle !== truck)
            .map((vehicle) => {
              return {
                name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                value: vehicle,
              };
            }),
        },
      ])
      .then((answers) => {
        const selectedVehicle = answers.vehicleToTow;
        truck.tow(selectedVehicle);
        this.performActions();
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
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
      .then((answers: { action: string }) => {
        if (answers.action === 'Print details') {
          for (const element of this.vehicles) {
            if ('vin' in element && element.vin === this.selectedVehicleVin) {
              element.printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          for (const element of this.vehicles) {
            if (element.vin === this.selectedVehicleVin) {
              element.reverse();
            }
          }
        } else if (answers.action === 'tow') {
          const truck = this.vehicles.find((vehicle) => vehicle instanceof Truck && vehicle.vin === this.selectedVehicleVin);
          if (truck) {
            this.findVehicleToTow(truck);
          } else {
            console.log("Only trucks can perform the tow action.");
          }
        } else if (answers.action === 'wheelie') {
          const motorbike = this.vehicles.find((vehicle) => vehicle instanceof Motorbike && vehicle.vin === this.selectedVehicleVin);
          if (motorbike) {
            console.log("The motorbike is performing a wheelie.");
          } else {
            console.log("Only motorbikes can perform a wheelie.");
          }
        } else if (answers.action === 'Select or create another vehicle') {
          this.startCli();
        } else {
          this.exit = true;
        }
        if (!this.exit) {
          this.performActions();
        }
      });
  }
  
  

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
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

export default Cli;
