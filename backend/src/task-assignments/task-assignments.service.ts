import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from './entities/task-assignment.entity';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from './dto/update-task-assignment.dto';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TaskAssignmentsService {
  constructor(
    @InjectRepository(TaskAssignment)
    private taskAssignmentsRepository: Repository<TaskAssignment>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<TaskAssignment[]> {
    return this.taskAssignmentsRepository.find({
      relations: ['task_id', 'user_id'],
    });
  }

  async findOne(id: number): Promise<TaskAssignment> {
    return this.taskAssignmentsRepository.findOne({
      where: { id: id },
      relations: ['task_id', 'user_id'],
    });
  }

  async create(
    createTaskAssignmentDto: CreateTaskAssignmentDto,
  ): Promise<TaskAssignment> {
    const task = await this.tasksRepository.findOne({
      where: { id: createTaskAssignmentDto.task_id },
    });
    if (!task) {
      throw new Error('Task not found');
    }

    const user = await this.usersRepository.findOne({
      where: { id: createTaskAssignmentDto.user_id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const newTaskAssignment = this.taskAssignmentsRepository.create({
      ...createTaskAssignmentDto,
      task_id: task,
      user_id: user,
    });
    return this.taskAssignmentsRepository.save(newTaskAssignment);
  }

  async update(
    id: number,
    updateTaskAssignmentDto: UpdateTaskAssignmentDto,
  ): Promise<TaskAssignment> {
    await this.taskAssignmentsRepository.update(id, updateTaskAssignmentDto);
    return this.taskAssignmentsRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.taskAssignmentsRepository.delete(id);
  }
}
