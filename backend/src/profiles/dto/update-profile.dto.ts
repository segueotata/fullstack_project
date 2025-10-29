import { PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

// PartialType torna todos os campos de CreateProfileDto opcionais
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
