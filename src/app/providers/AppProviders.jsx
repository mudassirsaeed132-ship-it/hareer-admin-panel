import MotionProvider from "./MotionProvider";
import QueryProvider from "./QueryProvider";

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <MotionProvider>{children}</MotionProvider>
    </QueryProvider>
  );
}
