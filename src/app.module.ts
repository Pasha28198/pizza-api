import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://admin:adminadmin@cluster0.md3tt.mongodb.net/pizza?retryWrites=true&w=majority`,
      {
        ssl: true,
        authSource: 'admin',
      },
    ),
    MulterModule.register({
      dest: './uploads',
    }),
    OrderModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
