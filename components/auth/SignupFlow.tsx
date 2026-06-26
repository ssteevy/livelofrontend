"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/api";
import { authApi, geoApi, type City } from "@/lib/auth";

const STEP_ORDER: SignupStep[] = ["email", "code", "password", "details"];

function StepIndicator({ step }: { step: SignupStep }) {
  const current = STEP_ORDER.indexOf(step);
  return (
    <div className="mb-6 flex items-center gap-2">
      {STEP_ORDER.map((_, index) => (
        <span
          key={index}
          className={`h-1.5 flex-1 rounded-full transition-all ${index <= current ? "bg-[#EDA415]" : "bg-[#B3D4E5]"}`}
        />
      ))}
    </div>
  );
}

type SignupStep = "email" | "code" | "password" | "details";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  department: string;
  city: string;
  acceptTerms: boolean;
}

const initialDetails: PersonalDetails = {
  firstName: "",
  lastName: "",
  birthDate: "",
  phone: "",
  department: "",
  city: "",
  acceptTerms: false,
};

const departments = [
  "Ouest",
  "Nord",
  "Sud",
  "Artibonite",
  "Centre",
  "Nord-Ouest",
  "Nord-Est",
  "Sud-Est",
  "Grand'Anse",
  "Nippes",
];

function SubmitButton({
  children,
  disabled = false,
  onClick,
}: {
  children: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-8 h-14 w-full rounded-md bg-[#EDA415] px-5 text-sm font-black tracking-[0.08em] text-white shadow-[0_4px_10px_rgba(78,115,199,0.16)] transition hover:bg-[#EDA415]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E73C7] disabled:cursor-not-allowed disabled:bg-[#ACACAC]/40 disabled:text-[#ACACAC]"
    >
      {children}
    </button>
  );
}

function Feedback({ message, error }: { message: string; error: string }) {
  if (!message && !error) return null;

  return (
    <p
      role={error ? "alert" : "status"}
      className={`mt-5 rounded-md px-4 py-3 text-left text-sm font-semibold ${
        error ? "bg-red-50 text-red-700" : "bg-[#E2F4FF] text-[#4E73C7]"
      }`}
    >
      {error || message}
    </p>
  );
}

function normalizePhone(phone: string) {
  const trimmed = phone.replace(/\s/g, "");
  if (trimmed.startsWith("+509")) return trimmed;
  return `+509${trimmed}`;
}

function TextInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-4 text-base text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
      />
    </label>
  );
}

export function SignupFlow() {
  const router = useRouter();
  const { completeRegister } = useAuth();
  const [step, setStep] = useState<SignupStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [tempToken, setTempToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState<PersonalDetails>(initialDetails);
  const [cities, setCities] = useState<City[]>([]);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRules = useMemo(
    () => [
      { label: "Au moins 8 caractères", valid: password.length >= 8 },
      { label: "Au moins 1 majuscule", valid: /[A-Z]/.test(password) },
      { label: "Au moins 1 minuscule", valid: /[a-z]/.test(password) },
      { label: "Au moins 1 chiffre", valid: /\d/.test(password) },
      { label: "Au moins 1 symbole", valid: /[^A-Za-z0-9]/.test(password) },
    ],
    [password],
  );

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isCodeValid = code.every((digit) => /^\d$/.test(digit));
  const isPasswordValid = passwordRules.every((rule) => rule.valid);
  const doPasswordsMatch = password.length > 0 && password === confirmPassword;
  const normalizedPhone = normalizePhone(details.phone);
  const areDetailsValid = Boolean(
    details.firstName &&
    details.lastName &&
    details.birthDate &&
    /^\+509[234]\d{7}$/.test(normalizedPhone) &&
    (cities.length === 0 || (details.department && details.city)) &&
    details.acceptTerms,
  );

  const citiesForDepartment = useMemo(() => {
    if (!details.department) return cities;
    return cities.filter((city) => city.departments?.nom === details.department);
  }, [cities, details.department]);

  useEffect(() => {
    geoApi.cities().then(setCities).catch(() => setCities([]));
  }, []);

  function updateDetail<Key extends keyof PersonalDetails>(key: Key, value: PersonalDetails[Key]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  function handleCodeChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setCode((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)));
  }

  function clearFeedback() {
    setApiError("");
    setApiMessage("");
  }

  async function submitEmail() {
    if (!isEmailValid || isSubmitting) return;

    clearFeedback();
    setIsSubmitting(true);
    try {
      const response = await authApi.initiateRegister(email);
      setApiMessage(response.message);
      setStep("code");
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitOtp() {
    if (!isCodeValid || isSubmitting) return;

    clearFeedback();
    setIsSubmitting(true);
    try {
      const response = await authApi.verifyOtp(email, code.join(""));
      setTempToken(response.temp_token);
      setStep("password");
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitDetails() {
    if (!areDetailsValid || isSubmitting) return;

    clearFeedback();
    setIsSubmitting(true);
    try {
      await completeRegister({
        temp_token: tempToken,
        password,
        confirme_password: confirmPassword,
        prenom: details.firstName,
        nom: details.lastName,
        date_naissance: details.birthDate,
        telephone: normalizedPhone,
        city_id: details.city || undefined,
        cgu_acceptees: details.acceptTerms,
      });
      router.push("/");
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderEmailStep() {
    return (
      <>        <h1 className="mt-5 text-xl font-black text-black">Bienvenue sur Livelo</h1>
        <p className="mt-3 text-base text-black/80">Utilisez votre email pour vous inscrire.</p>
        <div className="mt-9">
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Adresse email*"
          />
        </div>
        <Feedback message={apiMessage} error={apiError} />
        <SubmitButton disabled={!isEmailValid || isSubmitting} onClick={submitEmail}>
          {isSubmitting ? "ENVOI..." : "CONTINUER"}
        </SubmitButton>
        <div className="mt-10 flex items-center gap-3 text-sm text-[#ACACAC]">
          <span className="h-px flex-1 bg-[#B3D4E5]" />
          <span>ou continuer avec</span>
          <span className="h-px flex-1 bg-[#B3D4E5]" />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4E73C7] text-xl font-black text-white">f</button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B3D4E5] text-xl font-black text-[#4E73C7]">G</button>
        </div>
        <p className="mt-8 text-center text-xs leading-5 text-black">
          En continuant, vous acceptez les{" "}
          <a href="#conditions" className="text-[#EDA415]">Conditions d&apos;utilisation</a> et la{" "}
          <a href="#privacy" className="text-[#EDA415]">Politique de confidentialité</a>.
        </p>
      </>
    );
  }

  function renderCodeStep() {
    return (
      <>        <h1 className="mt-5 text-xl font-black text-black">Vérifiez votre adresse email</h1>
        <p className="mx-auto mt-3 max-w-xs text-base leading-6 text-black/80">
          Nous avons envoyé un code de vérification à <span className="font-semibold">{email}</span>
        </p>
        <div className="mt-9 flex justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              value={digit}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleCodeChange(index, event.target.value)}
              inputMode="numeric"
              aria-label={`Chiffre ${index + 1} du code`}
              maxLength={1}
              className="h-14 w-16 rounded-sm border border-[#ACACAC] text-center text-xl font-black text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none"
            />
          ))}
        </div>
        <Feedback message={apiMessage} error={apiError} />
        <SubmitButton disabled={!isCodeValid || isSubmitting} onClick={submitOtp}>
          {isSubmitting ? "VALIDATION..." : "VALIDER"}
        </SubmitButton>
        <p className="mt-5 text-center text-sm leading-6 text-black">
          Vous n&apos;avez pas reçu le code ? Vous pourrez demander un nouveau code dans{" "}
          <span className="text-[#EDA415]">52 secondes</span>
        </p>
      </>
    );
  }

  function renderPasswordStep() {
    return (
      <>        <h1 className="mt-5 text-xl font-black text-black">Créez votre compte</h1>
        <p className="mx-auto mt-3 max-w-sm text-base leading-6 text-black/80">
          Définissez un mot de passe sécurisé pour protéger votre compte Livelo.
        </p>
        <div className="mt-7 flex items-center justify-between bg-[#F8FAFC] px-4 py-4 text-sm">
          <span className="font-semibold text-black">{email}</span>
          <button type="button" onClick={() => setStep("email")} className="font-bold text-[#EDA415]">
            Modifier
          </button>
        </div>
        <div className="mt-6 space-y-4">
          <label className="relative block">
            <span className="sr-only">Mot de passe</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-4 pr-12 text-base text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
            />
            <button
              type="button"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ACACAC]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>
          <label className="relative block">
            <span className="sr-only">Confirmer le mot de passe</span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirmer le mot de passe"
              className={`h-14 w-full rounded-sm border bg-white px-4 pr-12 text-base text-[#4E73C7] placeholder:text-[#ACACAC] focus:outline-none ${
                confirmPassword && !doPasswordsMatch ? "border-[#EDA415]" : "border-[#ACACAC] focus:border-[#4E73C7]"
              }`}
            />
            <EyeOff aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={20} />
          </label>
        </div>
        <div className="mt-4 grid gap-2 text-left text-sm">
          {passwordRules.map((rule) => (
            <p key={rule.label} className={`flex items-center gap-2 ${rule.valid ? "text-[#30BD57]" : "text-[#ACACAC]"}`}>
              <Check aria-hidden="true" size={15} />
              {rule.label}
            </p>
          ))}
          {confirmPassword && !doPasswordsMatch ? (
            <p className="text-[#EDA415]">Les deux mots de passe doivent être identiques.</p>
          ) : null}
        </div>
        <Feedback message={apiMessage} error={apiError} />
        <SubmitButton disabled={!isPasswordValid || !doPasswordsMatch} onClick={() => {
          clearFeedback();
          setStep("details");
        }}>
          CONTINUER
        </SubmitButton>
      </>
    );
  }

  function renderDetailsStep() {
    return (
      <>        <h1 className="mt-5 text-xl font-black text-black">Informations personnelles</h1>
        <p className="mt-3 text-base text-black/80">Nous avons besoin de quelques détails pour finaliser votre compte.</p>
        <div className="mt-8 space-y-5 text-left">
          <TextInput label="Prénom" value={details.firstName} onChange={(value) => updateDetail("firstName", value)} placeholder="Prénom*" />
          <TextInput label="Nom" value={details.lastName} onChange={(value) => updateDetail("lastName", value)} placeholder="Nom*" />
          <TextInput label="Date de naissance" type="date" value={details.birthDate} onChange={(value) => updateDetail("birthDate", value)} placeholder="Date de naissance*" />
          <div className="grid grid-cols-[104px_1fr] gap-2">
            <label>
              <span className="sr-only">Préfixe</span>
              <select className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-3 text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none" defaultValue="+509">
                <option>+509</option>
              </select>
            </label>
            <TextInput label="Téléphone" value={details.phone} onChange={(value) => updateDetail("phone", value)} placeholder="34123456*" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="sr-only">Département</span>
              <select
                value={details.department}
                onChange={(event) => {
                  updateDetail("department", event.target.value);
                  updateDetail("city", "");
                }}
                className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-4 text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none"
              >
                <option value="">Département*</option>
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Ville</span>
              <select
                value={details.city}
                onChange={(event) => updateDetail("city", event.target.value)}
                className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-4 text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none"
              >
                <option value="">{cities.length > 0 ? "Ville*" : "Ville indisponible"}</option>
                {citiesForDepartment.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nom}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex items-start gap-3 text-sm leading-6 text-black">
            <input
              type="checkbox"
              checked={details.acceptTerms}
              onChange={(event) => updateDetail("acceptTerms", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#ACACAC] accent-[#EDA415]"
            />
            <span>
              J&apos;ai lu et j&apos;accepte les{" "}
              <a href="#conditions" className="text-[#EDA415]">Conditions d&apos;utilisation</a> et la{" "}
              <a href="#privacy" className="text-[#EDA415]">Politique de confidentialité</a>.
            </span>
          </label>
        </div>
        <Feedback message={apiMessage} error={apiError} />
        <SubmitButton disabled={!areDetailsValid || isSubmitting} onClick={submitDetails}>
          {isSubmitting ? "CRÉATION..." : "TERMINER"}
        </SubmitButton>
      </>
    );
  }

  return (
    <AuthShell>
      <StepIndicator step={step} />
      <div className="text-center sm:text-left">
        {step === "email" ? renderEmailStep() : null}
        {step === "code" ? renderCodeStep() : null}
        {step === "password" ? renderPasswordStep() : null}
        {step === "details" ? renderDetailsStep() : null}
      </div>
      <p className="mt-7 text-center text-sm font-medium text-[#4E73C7]">
        Vous avez déjà un compte ?{" "}
        <Link href="/connexion" className="font-black text-[#EDA415] hover:underline">
          Se connecter
        </Link>
      </p>
    </AuthShell>
  );
}
