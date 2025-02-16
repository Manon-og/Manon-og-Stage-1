"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const member_projects_service_1 = require("./member_projects.service");
const member_projects_controller_1 = require("./member_projects.controller");
let MemberProjectsModule = class MemberProjectsModule {
};
exports.MemberProjectsModule = MemberProjectsModule;
exports.MemberProjectsModule = MemberProjectsModule = __decorate([
    (0, common_1.Module)({
        controllers: [member_projects_controller_1.MemberProjectsController],
        providers: [member_projects_service_1.MemberProjectsService],
    })
], MemberProjectsModule);
//# sourceMappingURL=member_projects.module.js.map