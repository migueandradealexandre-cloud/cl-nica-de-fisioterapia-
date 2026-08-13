import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { 
  Activity, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Move, 
  Phone, 
  Star,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { createBooking } from "@/lib/bookings.functions";
import { useState } from "react";

const bookingFormSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  service: z.string().min(1, "Selecione um serviço"),
  date: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Instituto G+ | Fisioterapia e Reabilitação" },
      { name: "description", content: "Clínica de fisioterapia em Itapetininga/SP especializada em recuperação rápida e bem-estar." },
      { property: "og:title", content: "Instituto G+ | Fisioterapia" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" }
    ],
  }),
});

function Index() {
  const submitBooking = useServerFn(createBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      await submitBooking({ data });
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      reset();
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar sua solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "Fisioterapia Esportiva",
      description: "Recuperação de atletas e prevenção de lesões para alto desempenho.",
      icon: <Zap className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Reabilitação Pós-Cirúrgica",
      description: "Cuidado especializado para garantir uma recuperação segura e eficaz.",
      icon: <Activity className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Terapia Manual",
      description: "Técnicas manuais avançadas para alívio de dor e melhora da mobilidade.",
      icon: <Move className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "RPG e Postura",
      description: "Reeducação Postural Global para correção de desvios e alívio de tensões.",
      icon: <Users className="h-8 w-8 text-purple-500" />,
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Header/Nav */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">Instituto <span className="text-foreground">G+</span></span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">Início</a>
            <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">Serviços</a>
            <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">Sobre Nós</a>
            <Button onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}>
              Agendar Agora
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary-rgb),0.08)_0%,transparent_100%)]" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              {...fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium text-primary shadow-sm"
            >
              <Star className="h-4 w-4 fill-primary" />
              <span>A melhor clínica de fisioterapia de Itapetininga</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
            >
              Movimente-se com <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Liberdade e Vitalidade</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              Especialistas em fisioterapia avançada. Transformamos vidas através da reabilitação focada em resultados rápidos e duradouros.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" className="h-14 px-8 text-lg" onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}>
                Começar Tratamento <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Conhecer Serviços
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-3xl shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                alt="Instituto G+" 
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: "Equipamentos de Ponta", icon: <Zap className="h-6 w-6" /> },
                { label: "Ambiente Acolhedor", icon: <Heart className="h-6 w-6" /> },
                { label: "Foco no Resultado", icon: <CheckCircle2 className="h-6 w-6" /> },
                { label: "Atendimento VIP", icon: <Users className="h-6 w-6" /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wider">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Tratamentos Especializados</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Oferecemos as técnicas mais modernas para sua recuperação completa.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {services.map((service, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 border-primary/10 bg-muted/20">
                    <CardContent className="p-8">
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-md transition-transform group-hover:scale-110">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="agendar" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Move className="absolute top-10 left-10 h-64 w-64 rotate-12" />
            <Activity className="absolute bottom-10 right-10 h-64 w-64 -rotate-12" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Pronto para sua <br /> melhor versão?</h2>
                <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                  Não deixe a dor limitar sua vida. Agende uma avaliação hoje mesmo e comece sua jornada de recuperação com especialistas que se importam.
                </p>
                
                <div className="mt-10 space-y-4">
                  {[
                    "Avaliação física completa",
                    "Plano de tratamento personalizado",
                    "Equipamentos de última geração",
                    "Acompanhamento individual",
                    "Tecnologia de ponta e infraestrutura moderna"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-blue-300" />
                      <span className="text-lg font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white text-foreground shadow-2xl border-none">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Solicitar Agendamento</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input id="fullName" placeholder="Ex: João Silva" {...register("fullName")} />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input id="email" type="email" placeholder="joao@exemplo.com" {...register("email")} />
                          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" placeholder="(11) 99999-9999" {...register("phone")} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Serviço de Interesse</Label>
                        <Select onValueChange={(val) => setValue("service", val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="esportiva">Fisioterapia Esportiva</SelectItem>
                            <SelectItem value="pos-operatorio">Reabilitação Pós-Cirúrgica</SelectItem>
                            <SelectItem value="manual">Terapia Manual</SelectItem>
                            <SelectItem value="rpg">RPG e Postura</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem (Opcional)</Label>
                        <Textarea id="message" placeholder="Conte-nos brevemente sobre sua necessidade..." {...register("message")} />
                      </div>

                      <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Confirmar Solicitação"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="sobre" className="py-32 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Dra. Equipe" 
                    className="rounded-3xl shadow-xl w-full max-w-md mx-auto"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                    <div className="flex gap-1 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
                    </div>
                    <p className="text-sm font-bold">100% de satisfação dos nossos pacientes</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex-1">
                <h2 className="text-4xl font-bold tracking-tight">Cuidado Humano e Tecnologia de Ponta</h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  No Instituto G+, acreditamos que cada corpo é único. Nossa clínica foi fundada com o propósito de oferecer tratamentos personalizados que combinam o toque humano com as inovações tecnológicas mais recentes da fisioterapia.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Nossa equipe de fisioterapeutas altamente qualificados está em constante atualização para garantir que você receba o melhor tratamento possível, focado na sua rápida recuperação e retorno às atividades.
                </p>
                <div className="mt-10 flex gap-6">
                  <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Empatia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Excelência</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Inovação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold tracking-tight text-primary">Instituto G+</span>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Transformando a reabilitação física através de cuidado especializado e tecnologia avançada. Sua saúde é nossa prioridade número um.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Início</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Serviços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Agendamento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contato</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(15) 99654-5623</span>
                </li>
                <li>contato@institutogmais.com.br</li>
                <li>R. João Batista Macedo Mendes, 61 - Vila Rosa, Itapetininga - SP</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Instituto G+. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}