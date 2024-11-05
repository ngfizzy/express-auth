import { AppDataSource } from '../config';
import { Request } from '../models';
import { tVerif } from 'types';

export class AppRequestRepo {
  private reqRepo = AppDataSource.getRepository(Request);

  async fetchOrCreate(req: tVerif.AppRequestVals) {
    const existingReq = await this.reqRepo.findOneBy({ name: req });

    if (existingReq) {
      return existingReq;
    }

    const newReq = this.reqRepo.create({
      name: req,
    });

    return this.reqRepo.save(newReq);
  }

  fetchOneByName(name: tVerif.AppRequestVals) {
    return this.reqRepo.findOneBy({ name });
  }
}
