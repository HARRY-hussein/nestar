import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PropertyService {
    constructor(
            @InjectModel('Property') private readonly propertyModel: Model<null>,
            // private authService: AuthService, // memberModuleda import qilingan boshqa modulelardan instance olindi
            // private viewService: ViewService, // endi olingan instance bn ishlatish mn
        ) {}
}
