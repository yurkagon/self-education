import { Model, Document } from "mongoose";
import { NotFoundError } from "routing-controllers";

abstract class DatabaseService<T> {
  protected model: Model<Document, {}>;

  public async create(data: Partial<T>): Promise<T> {
    const instance = new this.model(data);

    const document = await instance.save();

    return document.toObject();
  }

  public async get(id: string): Promise<T> {
    const document = await this.model.findById(id);

    if (!document) {
      throw new NotFoundError("Not found.");
    }

    return document.toObject();
  }

  public async getAll(queryData?: Partial<T>): Promise<T[]> {
    const documents: T[] = await this.model.find(queryData).lean();

    return documents;
  }

  public getByListOfIds(ids: string[]): Promise<T[]> {
    return Promise.all(ids.map((id) => this.get(id)));
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const document = await this.model.findOneAndUpdate({ _id: id }, data, {
      runValidators: true,
      new: true,
    });

    return document.toObject();
  }

  public async delete(id: string): Promise<T> {
    const document = await this.model.findByIdAndRemove(id);

    if (!document) {
      throw new NotFoundError("Not found.");
    }

    return document.toObject();
  }

  public async findOne(queryData: Partial<T>): Promise<T> {
    const document = await this.model.findOne(queryData);

    if (!document) {
      throw new NotFoundError("Not found.");
    }

    return document.toObject();
  }
}

export default DatabaseService;
