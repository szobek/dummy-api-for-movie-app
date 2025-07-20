export class ListGenreDto {
    
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}