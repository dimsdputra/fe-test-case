'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodo } from '~/hooks/todo';
import { todoSchema, TodoSchemaType } from '~/schemas/todo';
import Spinner from '../ui/spinner';

export function TodoCreate() {
  const form = useForm<TodoSchemaType>({
    resolver: zodResolver(todoSchema),
  });

  const { create, isSuccess, isLoading } = useCreateTodo();

  const onSubmit = (data: TodoSchemaType) => {
    /**
     * @todo: Add the functionality to reset the form if the todo is created successfully
     */

    create(data);
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    } else {
      console.log('Failed to create todo');
    }
  }, [isSuccess]);

  return (
    <div className="max-w-[500px] w-full p-2 border border-gray-100">
      <Spinner isLoading={isSuccess ? false : isLoading} />
      <div className="flex flex-col gap-y-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Form Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="border px-2 rounded-sm border-gray-300 w-full h-8"
              {...form.register('title')}
            />
            <span className="text-red-500 text-xs">
              {form.formState.errors.title?.message}
            </span>
          </div>

          {/* Form Description */}
          <div className="flex flex-col gap-2 pt-2">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="border px-2 py-1 rounded-sm border-gray-300 w-full"
              {...form.register('description')}
            />
            <span className="text-red-500 text-xs">
              {form.formState.errors.description?.message}
            </span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3 py-2 bg-gray-200 text-sm hover:bg-gray-300 cursor-pointer active:scale-95 w-fit transition-transform duration-150 rounded-sm flex gap-x-2 items-center"
            >
              💾 <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
