class Person {
  name: string;

  constructor(initName: string) {
    this.name = initName;
  }
}

const quil = new Person("Quill");
console.log(quil);
