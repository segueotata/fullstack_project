import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesService {
    private profilesRepository;
    constructor(profilesRepository: Repository<Profile>);
    create(createProfileDto: CreateProfileDto): Promise<Profile>;
    findAll(): Promise<Profile[]>;
    findOne(id: number): Promise<Profile | null>;
    findByUsername(username: string): Promise<Profile | null>;
    update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile>;
    remove(id: number): Promise<void>;
}
