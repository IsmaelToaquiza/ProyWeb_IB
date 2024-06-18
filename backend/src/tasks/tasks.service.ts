import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/entities/project.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['project_id'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({
      where: { id: id },
      relations: ['project_id'],
    });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsRepository.findOne({
      where: { id: createTaskDto.project_id },
    });
    if (!project) {
      throw new Error('Project not found');
    }

    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      project_id: project,
      status: createTaskDto.status as TaskStatus, // Aseguramos que el status sea del tipo correcto
    });
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new Error('Task not found');
    }

    if (updateTaskDto.project_id) {
      const project = await this.projectsRepository.findOne({
        where: { id: updateTaskDto.project_id },
      });
      if (!project) {
        throw new Error('Project not found');
      }
      task.project_id = project;
    }

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }

    if (updateTaskDto.status !== undefined) {
      task.status = updateTaskDto.status as TaskStatus;
    }

    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
