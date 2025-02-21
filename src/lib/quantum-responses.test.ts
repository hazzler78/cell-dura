import { getQuantumResponse, FALLBACK_RESPONSES, INDUSTRY_RESPONSES, DEFAULT_RESPONSES, ResponseCategory } from './quantum-responses';

describe('Quantum Response System Tests', () => {
  // Helper function to run multiple tests
  const testMultipleQueries = (queries: string[], expectedCategory: string): void => {
    queries.forEach(query => {
      test(`matches "${query}" to ${expectedCategory} category`, () => {
        const response = getQuantumResponse(query);
        // Log the actual response for debugging
        console.log(`Query: "${query}" -> Response: "${response}"`);
        
        // Verify response is not a default response
        const isDefault = DEFAULT_RESPONSES.includes(response);
        expect(isDefault).toBe(false);
        
        // Verify response comes from correct category
        const categoryResponses = [...FALLBACK_RESPONSES, ...INDUSTRY_RESPONSES]
          .find((cat: ResponseCategory) => cat.keywords.some(k => expectedCategory.includes(k)))
          ?.responses || [];
        expect(categoryResponses).toContain(response);
      });
    });
  };

  // Test greetings
  testMultipleQueries(['hello', 'hi', 'hey', 'greetings'], 'hello');

  // Test industry-specific queries
  testMultipleQueries(['manufacturing process', 'factory automation'], 'manufacturing');
  testMultipleQueries(['healthcare AI', 'medical diagnosis'], 'healthcare');
  testMultipleQueries(['finance automation', 'banking AI'], 'finance');

  // Test error handling
  test('handles empty input', () => {
    const response = getQuantumResponse('');
    expect(DEFAULT_RESPONSES).toContain(response);
  });

  test('handles undefined input', () => {
    const response = getQuantumResponse(undefined as unknown as string);
    expect(DEFAULT_RESPONSES).toContain(response);
  });
}); 