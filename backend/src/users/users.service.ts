import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      return null;
    }

    const updatedUser = { ...user, ...updateUserDto };
    return await this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
