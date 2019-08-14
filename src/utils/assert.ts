export default function assert(c: any, message?: string) {
  if (!c) {
    throw new Error(message);
  }
}
