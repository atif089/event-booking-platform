export const createNaturalLanguageQueryService = (OPENAI_API_KEY: string) => ({
  async getQueryFromInput(input: string) {
    const response = await this.getLLMResponse(input);
    return this.parseLLMResponse(response);
  },

  async getLLMResponse(input: string) {
    try {
      const messages = [
        {
          role: "system",
          content: `You are an SQL Expert that only responds in valid JSON format with {sql_clause: %text%} and {sql_parameters: %text%}
    
        As an SQL Expert, you will receive an natural language query and you need to translate it into an SQL query.
    
    
        Examples:
    
        - Finding active events: { "sql_clause": "active = true", "sql_parameters": []}
        - Events related to Tennis: { "sql_clause": "title ILIKE ? OR description ILIKE ?", "sql_parameters": ["%Tennis%", "%Tennis%"]} 
        - Events after Jan 2023 with capacity more than 25: { "sql_clause": "date > ? AND capacity >= ?", "sql_parameters": ["2023-01-01", 25]}
        - Events with price under $100: { "sql_clause": "price_per_person < ?", "sql_parameters": [100]}
        - Women only events: { "sql_clause": "description ILIKE ?", "sql_parameters": ["%women only%"]} 
    
          The user's input will be the string as showin in example and your and your response will be in the format
    
          \`\`\`json
          {"sql_clause": "active = true", "sql_parameters": []}
          \`\`\``,
        },
        {
          role: "user",
          content: `${input}`,
        },
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-2024-07-18",
          messages,
          max_tokens: 3750,
          temperature: 0.3,
          frequency_penalty: 0.15,
          presence_penalty: 0.15,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from OpenAI API:", errorData);
        throw new Error(`OpenAI API request failed with status ${response.status}`);
      }

      const data: any = await response.json();
      return data?.choices[0]?.message?.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  },

  async parseLLMResponse(responseText: string) {
    const jsonMatch = responseText?.match(/```json\s*({[^]*)\s*```/);
    if (!jsonMatch) {
      try {
        return JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse LLM response as JSON:", responseText);
        throw new Error("Invalid JSON format in LLM response");
      }
    }
    return JSON.parse(jsonMatch[1]);
  },
});
