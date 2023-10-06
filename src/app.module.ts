import { Module } from '@nestjs/common';
import { GameModule } from './Game/game.module';

@Module({
  imports: [GameModule],
})
export class AppModule {}
