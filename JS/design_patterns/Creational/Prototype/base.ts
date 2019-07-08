class Prototype {
  private someValue = 1;

  public clone(): Prototype {
    // `return _.cloneDeep(this);` would be better
    return Object.create(this);
  }
}
