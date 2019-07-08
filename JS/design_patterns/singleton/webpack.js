class Singleton {
  _field = '';

  setField (value) {
    this._field = value;
  }

  getField() {
    return this._field;
  }
}

export default new Singleton();
