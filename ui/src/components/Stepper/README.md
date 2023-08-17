# Stepper Usage

Sample usage in `'CreateNewClientDialog'` file

```js
<Stepper steps={[{ i18n: 'text', completed: false, step: 0 }]} activeStep={$numberActiveStep} />
```

> Required props below

```ts
type activeStep = number | undefined;

type StepperStepProps = {
	i18n: string;
	step: number;
	completed?: boolean;
};

type steps = StepperStepProps[];

// StepperStepsProps is template for steps prop
```

You can extend properties by mutating the object from the `steps` array
