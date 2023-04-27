import { Novu } from "@novu/node";
import dotenv from "dotenv";

dotenv.config();

export const getNotification = async (
  title: string,
  description: string,
  email: string,
  Id: string
): Promise<void> => {
  const novu = new Novu(process.env.NOVU_API_KEY || "");
  await novu.subscribers.identify(Id, {
    email,
    firstName: "Subscriber",
  });

  await novu.trigger("momentum--L67FbJvt", {
    to: { subscriberId: Id, email },
    payload: {
      title,
      description,
    },
  });
};

export const smsNotification = async (
  title: string,
  description: string,
  phone: string,
  Id: string
): Promise<void> => {
  const novu = new Novu(process.env.NOVU_API_KEY || "");

  await novu.trigger("sms", {
    to: {
      subscriberId: Id,
      phone: `+33${phone}`,
    },
    payload: {
      title,
      description,
    },
  });
};

export const inAppNotification = async (
  title: string,
  description: string,
  Id: string
): Promise<void> => {
  const novu = new Novu(process.env.NOVU_API_KEY || "");

  try {
    await novu.subscribers.identify(Id, {
      firstName: "inAppSubscriber",
    });

    await novu.trigger("taskies", {
      to: {
        subscriberId: Id,
      },
      payload: {
        title,
        description,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
