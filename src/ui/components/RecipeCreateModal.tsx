import React from 'react';
import {Field, Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
import TextInput from '../elements/forms/TextInput';
import {FormRecipe} from '../../services/RecipeService';
import styled from 'styled-components';

interface RecipeCreateModalProps {
  onSubmit: (recipe: FormRecipe) => void;
  closeModal: () => void;
}

const required = (value: string|undefined) => (value ? undefined : 'Required');

export const RecipeCreateModal = ({onSubmit, closeModal}: RecipeCreateModalProps) => {
  return (
    <Modal>
      <h1>Create Recipe</h1>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators
        }}
        render={({
          handleSubmit,
          form: {
            mutators: {push, pop}
          },
          pristine,
          form,
          submitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <Field<string>
                name="title"
                component={TextInput}
                placeholder="Recipe Title"
              />
            </div>
            <br/>
            <br/>
            <button onClick={() => push('ingredients', undefined)}>
                Add Ingredient
            </button>
            <br/>
            <FieldArray name="ingredients">
              {({fields}) =>
                fields.map((name, index) => (
                  <div key={name}>
                    <label>{index + 1}</label>
                    <br/>
                    <Field name={`${name}.name`} validate={required}>
                      {({input, meta}) => (
                        <div>
                          <label>Name</label>
                          <input {...input} type="text" placeholder="Name"/>
                          {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                    <span
                      onClick={() => fields.remove(index)}
                      style={{cursor: 'pointer'}}
                    >
                      ❌
                    </span>
                    <br/>
                    <br/>
                  </div>
                ))
              }
            </FieldArray>
            <br/>
            <br/>
            <br/>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                      Submit
              </button>
              <button
                type="button"
                onClick={() => form.reset()}
                disabled={submitting || pristine}
              >
                      Reset
              </button>
            </div>
          </form>
        )}
      />
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  min-width: 250px;
  max-width: 500px;
  height: 40vh;
  margin: auto;
  -webkit-box-shadow: 0 -2px 25px 0 rgba(0, 0, 0, 0.15), 0 13px 25px 0 rgba(0, 0, 0, 0.3);
  background-color: #FFFFFF;
`;
