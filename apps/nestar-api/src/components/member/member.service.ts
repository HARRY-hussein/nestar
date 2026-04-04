import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private readonly memberModel: Model<null>) {}
  
  public async signup(): Promise<string> {
    return 'signup executed!';
  }

  public async login(): Promise<string> {
    return 'login executed!';
  }

  public async updateMember(): Promise<string> {
    return 'updateMember executed!';
  }

  public async getMember(): Promise<string> {
    return 'getMember executed!';
  }

}