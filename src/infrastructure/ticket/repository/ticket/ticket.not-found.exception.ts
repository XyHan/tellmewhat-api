export class TicketNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}
