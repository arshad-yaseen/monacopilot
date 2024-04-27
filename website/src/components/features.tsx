import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DoubleArrowRightIcon,
  LightningBoltIcon,
  ShadowIcon,
} from '@radix-ui/react-icons';

const FEATURES = [
  {
    icon: LightningBoltIcon,
    title: 'Framework Specific Completions',
    description: 'Get completions based on the framework you are using.',
  },
  {
    icon: ShadowIcon,
    title: '55+ Custom Themes',
    description:
      'Choose from a wide range of themes to customize your editor easily.',
  },
  {
    icon: DoubleArrowRightIcon,
    title: 'Fast completions',
    description: 'Get completions in fast and efficient way.',
  },
];

const Features = () => {
  return (
    <section className="w-full relative  flex flex-col items-center justify-center gap-10">
      <div className="w-full overflow-hidden">
        <h2 className="lg:block text-[20.5rem] hidden leading-none opacity-10 -mt-8 font-semibold text-center">
          Features
        </h2>
      </div>
      <div className="w-full absolute top-[11.5rem] h-48 bg-background blur-xl" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 container z-20 relative -mt-10">
        {FEATURES.map((feature, index) => (
          <Card key={index} className="rounded-xl h-full">
            <CardHeader className="gap-2">
              <feature.icon className={'size-10 text-neutral-400'} />
              <div />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
