import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { MainappModule } from './mainapp/mainapp.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MainappModule,
    PrometheusModule.register({
      path: '/metrics', // default is /metrics
      defaultMetrics: {
        enabled: true, // Enable the collection of default metrics
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
