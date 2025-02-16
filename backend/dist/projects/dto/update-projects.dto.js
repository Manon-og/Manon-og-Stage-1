"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_projects_dto_1 = require("./create-projects.dto");
class UpdateProjectsDto extends (0, mapped_types_1.PartialType)(create_projects_dto_1.CreateProjectsDto) {
}
exports.UpdateProjectsDto = UpdateProjectsDto;
//# sourceMappingURL=update-projects.dto.js.map