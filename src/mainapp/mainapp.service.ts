import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { confDto } from './dto/config.dto';
@Injectable()
export class MainappService {
  constructor(private prisma: PrismaService) {}

  private async checkIfQazaPrayerExists(
    userId: number,
    date: Date,
  ): Promise<boolean> {
    const existingPrayer = await this.prisma.qazaPrayer.findMany({
      where: {
        userId: userId,

        date: date,
      },
    });
    return existingPrayer !== null;
  }
  async setConfig(dto: confDto) {
    console.log(new Date());
    try {
      await this.prisma.user.update({
        where: {
          id: dto.id,
        },
        data: {
          birthDate: dto.birthDate,
          NamazStartes: dto.NamazStartes,
          firstName: dto.firstName,
          firstTime: dto.firstTime,
          lastName: dto.lastName,
        },
      });
      const differense = await this.prisma.user.findUnique({
        where: {
          id: dto.id,
        },
      });
      console.log(
        Math.floor(calculateTimeDifference(differense.birthDate) / 86400),
        'kun',
      );
      const qazo = Math.floor(
        (calculateTimeDifference(differense.firstTime) -
          calculateTimeDifference(differense.NamazStartes)) /
          86400,
      );
      await this.prisma.user
        .update({
          where: {
            id: dto.id,
          },
          data: {
            asr: qazo,
            bomdod: qazo,
            peshin: qazo,
            shom: qazo,
            xufton: qazo,
          },
        })

        .catch((e) => {
          console.log(e);
        });

      // const  prayer =  await this.createMissedPrayers(dto.id)
      console.log(await this.calculateMissedPrayers(1));
      await this.calculateMissedPrayers(1);
      return {
        message: 'ok',
        // parayer: prayer,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async calculateMissedPrayers(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const { firstTime, NamazStartes } = user;
    const missedPrayers = [];
    console.log(
      'date',
      new Date(NamazStartes).toLocaleDateString() == '05/07/2024',
    );
    //  console.log(
    //    'date1',
    //    new Date(NamazStartes).toLocaleDateString()
    //  );
    const date = new Date(NamazStartes).toISOString();
    console.log(
      'date3',
      date.substring(0, date.indexOf('T')) ==
        new Date('2024-07-05T15:14:14.539Z')
          .toISOString()
          .substring(0, date.indexOf('T')),
    );
    console.log(date.substring(0, date.indexOf('T')));

    const currentDate = new Date();
    const currentDateCheck = new Date(firstTime);

    while (currentDateCheck <= currentDate) {
      const isBeforeNamazBegunDay = currentDateCheck < NamazStartes;

      missedPrayers.push({
        date: new Date(currentDateCheck),
        fajr: isBeforeNamazBegunDay,
        dhuhr: isBeforeNamazBegunDay,
        asr: isBeforeNamazBegunDay,
        maghrib: isBeforeNamazBegunDay,
        isha: isBeforeNamazBegunDay,
        userId: user.id,
      });

      currentDateCheck.setDate(currentDateCheck.getDate() + 1);
    }

    return missedPrayers;
  }
  async createMissedPrayers(userId: number) {
    const missedPrayers = await this.calculateMissedPrayers(userId);

    const createdPrayers = [];

    for (const prayer of missedPrayers) {
      const createdPrayer = await this.prisma.qazaPrayer.create({
        data: prayer,
      });
      createdPrayers.push(createdPrayer);
    }

    return createdPrayers;
  }
}

const calculateTimeDifference = (eventTime: Date) => {
  return (
    Math.floor(Date.now() / 1000) -
    Math.floor(new Date(eventTime).getTime() / 1000)
  );
};
