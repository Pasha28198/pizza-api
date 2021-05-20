"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiseShema = exports.Choise = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const product_shemas_1 = require("./product.shemas");
let Choise = class Choise {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Choise.prototype, "mass", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Choise.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Choise.prototype, "price", void 0);
__decorate([
    mongoose_1.Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } }),
    __metadata("design:type", product_shemas_1.Product)
], Choise.prototype, "product", void 0);
Choise = __decorate([
    mongoose_1.Schema()
], Choise);
exports.Choise = Choise;
exports.ChoiseShema = mongoose_1.SchemaFactory.createForClass(Choise);
//# sourceMappingURL=choise.shemas.js.map