import { Module } from '@nestjs/common';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

//test db
// `mongodb+srv://admin:adminadmin@cluster0.md3tt.mongodb.net/pizza?retryWrites=true&w=majority`,


@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://pizza_admin:Dirtydjeck1@pizza.wgd9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        ssl: true,
        authSource: 'admin',
      },
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
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
