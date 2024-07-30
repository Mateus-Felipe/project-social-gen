import os
from dataclasses import dataclass
from langchain.agents import AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate

from langchain_community.utilities import DuckDuckGoSearchAPIWrapper
from langchain_community.tools.ddg_search.tool import DuckDuckGoSearchResults

from langchain_mistralai import ChatMistralAI
import re
import json

'''
Theme for post: AI. Pages: 2. Profile: @mateusfelipe.x. Humor: Helpful. Post Context: What is an AI?
'''

def process_text(text):
    llm = ChatMistralAI(
        api_key="",
        model_name="mistral-large-2407",
        temperature=0,
        max_tokens=1000,
        top_p=1,
        # verbose=True,
        n_ctx=10000
    )

    ddgSearch = DuckDuckGoSearchAPIWrapper()
    ddg_search_tool = DuckDuckGoSearchResults(api_wrapper=ddgSearch)

    tools = [ddg_search_tool]

    llm_with_tools = llm.bind_tools(tools=tools)

    template = '''Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.
    Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.
    Overall, Assistant have some powerful tools that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or a particular topic, Tool is here to assist.
    
    You are a social media, you have to create a post for social media using the user input. You need use context, the number of pages and create a page using the provided humor.
    This is the format of the user input:
    '
    Theme for post: the theme of the content of the post.
    Pages: the quantity of pages. you will create some text for each page.
    Profile: you can use the profile if you want.
    Humor: The humor of the content. humor can be: Helpful, Funny, Hilarious, News, Informative or Serious.
    Post Context: The context to help to create the post.
    '
    
    TOOLS:
    ------
    Assistant has access to the following tools:
    {tools}
    If the post need some information that you do not know, use a tool to search for a information.
    To use a tool, please use the following format:
    
    Thought: Do I need to use a tool? Yes
    Action: the action to take, should be one of [{tool_names}]. Ever use the 'Action Input + tool name' to call for a tool and await for it answer.
    Action Input: the input to the action. call it and await it answer
    Observation: the result of the action

    When you have the text post for the Human, you MUST use the exactly format:

    Thought: Do I need to use a tool? No
    Final Answer: [your response here]

    the max characters of the text of each page in the response is 550.
    Your response will have:
    
    postdescription: the post description, the post description is a big text with all the information together reformulated into a unique text and with all the hashtags if needed. (post description is a text, hashtags are lower case. The max characters of the postdescription is 900)
    page: an array, where each index is a text for each page (page is a array with texts. the max characters of the text of each page is 550.)
    
    You response final answer need follow the format like the exactly following example:
    
    Thought: Do I need to use a tool? No
    Final Answer: "postdescription": the content here, "page": [the content here] (it's a json format)
    
    Begin!
    New input: {input}
    {agent_scratchpad}'''
    prompt = PromptTemplate.from_template(template)
    # os.system('cls' if os.name == 'nt' else 'clear')
    # print("Welcome for the AI Assistant With Search Tool!")
    # print("Your Input: ")
    question = text
    agent = create_react_agent(llm=llm_with_tools, tools=tools, prompt=prompt)

    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)
    response = agent_executor.invoke({
        "input": f"{question}"
    })
    # print("------------------------------------------------------------\n------------------------------------------------------------\n------------------------------------------------------------")
    print(response)
    response_parset = response.get('output')
    print("------------------------------------------------------------\n------------------------------------------------------------\n------------------------------------------------------------")
    print(response_parset)
    return response_parset
    # response = agent_executor.invoke({
    #     "input": f"{question}",
    # })
    
def parse_response(response_text):
    # Use regular expressions to extract the post description and page contents
    post_description_pattern = re.compile(r"'postdescription':\s*'([^']+)'")
    page_pattern = re.compile(r"'page':\s*\[([^\]]+)\]")

    post_description_match = post_description_pattern.search(response_text)
    page_match = page_pattern.search(response_text)

    if post_description_match and page_match:
        post_description = post_description_match.group(1)
        pages = [page.strip().strip("'") for page in page_match.group(1).split("', '")]

        # Create a JSON object
        parsed_json = {
            "postDescription": post_description,
            "page": pages
        }

        return json.dumps(parsed_json, ensure_ascii=False)
    else:
        return json.dumps({"error": "Invalid response format"})
