export default function assert<T>(c: T, message?: string) {
  if (!c) {
    throw new Error(message);
  }
}
