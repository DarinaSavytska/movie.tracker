import { createClient } from '@sanity/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanity: any = createClient({
  projectId: '79b1z406',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token:
    'skIRl9ay97z3N1tIgOIGZePL7PHazpuCOzWGFGdHQLWNCQ1Mr13IYBr6YY9P7oIqS15foBvNo2qz4hNQMtGEIVYnqyvMNWi7QyBNhmB7aYUZZzbVRGjMLjEpNpYZ245ybQvwnTw36EybAPKdBJUBiNjVQdeBDju87NAKy4K3umDYvUbubF3Y',
});
