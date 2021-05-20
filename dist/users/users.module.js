"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_shemas_1 = require("./shemas/user.shemas");
const users_controller_1 = require("./users.controller");
const address_shemas_1 = require("./shemas/address.shemas");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        providers: [users_service_1.UsersService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_shemas_1.User.name, schema: user_shemas_1.UserShema },
                { name: address_shemas_1.Address.name, schema: address_shemas_1.AddressShema },
            ]),
        ],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map