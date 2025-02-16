"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberProjectDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_member_project_dto_1 = require("./create-member_project.dto");
class UpdateMemberProjectDto extends (0, mapped_types_1.PartialType)(create_member_project_dto_1.CreateMemberProjectDto) {
}
exports.UpdateMemberProjectDto = UpdateMemberProjectDto;
//# sourceMappingURL=update-member_project.dto.js.map