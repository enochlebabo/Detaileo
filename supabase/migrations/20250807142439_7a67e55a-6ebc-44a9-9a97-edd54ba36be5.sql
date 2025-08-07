-- Fix RLS policies to remove anonymous access for chat tables
DROP POLICY "Users can view their own conversations" ON public.chat_conversations;
DROP POLICY "Users can create conversations" ON public.chat_conversations;
DROP POLICY "Users can update their own conversations" ON public.chat_conversations;
DROP POLICY "Users can view messages from their conversations" ON public.chat_messages;
DROP POLICY "Users can create messages in their conversations" ON public.chat_messages;

-- Recreate policies without anonymous access
CREATE POLICY "Authenticated users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create their own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = chat_messages.conversation_id 
    AND auth.uid() = user_id
  )
);

CREATE POLICY "Authenticated users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = chat_messages.conversation_id 
    AND auth.uid() = user_id
  )
);