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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberProjectsController = void 0;
const common_1 = require("@nestjs/common");
const member_projects_service_1 = require("./member_projects.service");
const create_member_project_dto_1 = require("./dto/create-member_project.dto");
let MemberProjectsController = class MemberProjectsController {
    constructor(memberProjectsService) {
        this.memberProjectsService = memberProjectsService;
    }
    create(createMemberProjectDto) {
        return this.memberProjectsService.create(createMemberProjectDto);
    }
    createMany(createManyMemberProjectDto) {
        return this.memberProjectsService.createMany(createManyMemberProjectDto);
    }
    findAll() {
        return this.memberProjectsService.findAll();
    }
    findOne(id) {
        return this.memberProjectsService.findOne(id);
    }
    delete(id) {
        return this.memberProjectsService.delete(id);
    }
};
exports.MemberProjectsController = MemberProjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_project_dto_1.CreateMemberProjectDto]),
    __metadata("design:returntype", void 0)
], MemberProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('create-many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_project_dto_1.CreateManyMemberProjectDto]),
    __metadata("design:returntype", void 0)
], MemberProjectsController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MemberProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MemberProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MemberProjectsController.prototype, "delete", null);
exports.MemberProjectsController = MemberProjectsController = __decorate([
    (0, common_1.Controller)('member-projects'),
    __metadata("design:paramtypes", [member_projects_service_1.MemberProjectsService])
], MemberProjectsController);
//# sourceMappingURL=member_projects.controller.js.map