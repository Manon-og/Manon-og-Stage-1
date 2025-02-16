"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMembersDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_members_dto_1 = require("./create-members.dto");
class UpdateMembersDto extends (0, mapped_types_1.PartialType)(create_members_dto_1.CreateMembersDto) {
}
exports.UpdateMembersDto = UpdateMembersDto;
//# sourceMappingURL=update-members.dto.js.map