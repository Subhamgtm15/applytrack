import { CreateApplicationDto } from "./create-application.dto";

// An update replaces the full record, so it shares the same shape/validation as create.
export class UpdateApplicationDto extends CreateApplicationDto {}
