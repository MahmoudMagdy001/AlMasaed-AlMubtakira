import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  ShieldCheck,
  Siren,
  Cpu,
  FileText,
  DoorClosed,
  AlertOctagon,
  Droplets,
  BatteryCharging,
  Zap,
  Sparkles,
  Cog,
  Sliders,
  Wrench,
  Award,
  PackageCheck,
  Maximize2,
  CheckCheck,
  Eye,
  FileSpreadsheet,
  BadgeCheck,
  Clock,
  ShieldAlert,
  ArrowUpDown,
  Users,
  ScanLine,
  Activity,
  HeartHandshake,
  Building2,
  Home,
  Truck,
  Package,
  Search,
  ClipboardCheck,
  MoveRight,
  Accessibility,
  Compass,
  Scan,
} from 'lucide-react'
import type { ServiceKey } from './ServiceDetailPage'

export type IconComponent = ComponentType<LucideProps>

/**
 * Dedicated contextual icons for each item in the "What's Included / نطاق العمل"
 * section of every service, replacing generic checkmarks with semantic icons.
 */
const serviceIncludedIcons: Record<ServiceKey, IconComponent[]> = {
  maintenance: [
    ShieldCheck, // عقود صيانة دورية معتمدة رسمياً لدى الدفاع المدني
    Siren, // فرق طوارئ جاهزة للاستجابة السريعة للأعطال في جدة
    Cpu, // فحص وقائي شهري شامل للمحركات والمنظومة الكهربائية
    FileText, // تقارير فنية إلكترونية مع تتبع دقيق لكفاءة التشغيل
    DoorClosed, // فحص ومعايرة أقفال الأبواب والستائر الضوئية وحساسات الأمان
    AlertOctagon, // اختبار كوابح الطوارئ ومنظمات السرعة وأنظمة النزول التلقائي
    Droplets, // تزييت وتشحيم مسارات السكك والبكرات والأجزاء المتحركة
    BatteryCharging, // فحص البطاريات الاحتياطية وأجهزة الإنقاذ الآلي عند انقطاع الكهرباء
  ],
  modernization: [
    Cpu, // ترقية لوحات التحكم الذكية بنظام الميكروبروسيسور المتطور
    Zap, // خفض استهلاك الطاقة حتى 40% بمحولات التردد VVVF الحديثة
    Sparkles, // تجديد ديكورات الكابينة بلمسات عصرية وإضاءة موفرة LED
    ShieldCheck, // تحديث مشغلات الأبواب بحساسات أمان مانعة للاحتجاز
    Cog, // استبدال ماكينات السحب بمحركات أوروبية بدون تروس Gearless
    Sliders, // ترقية أزرار الطوابق وشاشات العرض الرقمية التفاعلية
    Wrench, // معايرة وتجديد الصمامات والمكابس الهيدروليكية
    Award, // اختبارات أحمال متكاملة وإصدار شهادة تشغيل معتمدة
  ],
  installation: [
    PackageCheck, // توريد ماكينات ومعدات أوروبية وإيطالية أصلية بضمان شامل
    Maximize2, // حلول متطورة للمساحات المحدودة بدون غرفة محرك (MRL)
    CheckCheck, // تنفيذ هندسي ليزري دقيق متوافق مع كود البناء والدفاع المدني
    Eye, // مصاعد بانورامية وزجاجية فاخرة بتصاميم معمارية خاصة
    FileSpreadsheet, // دراسة دقيقة للمخططات الهندسية ومطابقة مواصفات بئر المصعد
    Sliders, // تثبيت سكك التوجيه والأبواب بمحاذاة ميكانيكية متطورة
    BatteryCharging, // برمجة أجهزة الطوارئ ونظام الهبوط التلقائي عند انقطاع التيار
    Award, // تسليم معتمد مع اختبارات الأحمال والسرعة وفترة صيانة مجانية
  ],
  spareParts: [
    BadgeCheck, // قطع غيار أصلية 100% لكافة الماركات والموديلات المعتمدة
    Clock, // توفير فوري من مستودعاتنا في جدة لتقليل فترات التوقف
    Cog, // وحدات طاقة ومضخات هيدروليكية ومحركات سحب أصلية
    ShieldCheck, // ضمان جودة معتمد ضد عيوب التصنيع وسوء التركيب
    Cpu, // لوحات تحكم وكروت إلكترونية وحواسب توقف دقيق
    DoorClosed, // مشغلات أبواب وأحزمة وأقفال ميكانيكية وحساسات ليزرية
    Droplets, // حبال جر فولاذية وبكرات توجيه وزيوت هيدروليك معتمدة
    ShieldAlert, // أجهزة سلامة وكوابح باراشوت وستائر حماية إلكترونية
  ],
  escalators: [
    ArrowUpDown, // فحص وصيانة دورية دقيقة للدرجات والأمشاط وسلاسل الجر
    Sliders, // معايرة واختبار درابزين اليد المتحرك وأجهزة التوقف الطارئ
    Droplets, // تشحيم وتزييت مبرمج يمنع الضوضاء والاهتزاز ويطيل عمر السلم
    Users, // فحص شامل معتمد يضمن سلامة العائلات والأطفال بالمنشآت
    Cog, // صيانة علبة التروس (Gearbox) ومحركات السحب والكوابح الديناميكية
    ScanLine, // اختبار حساسات الأمان المانعة لاصطدام الأمشاط وكسر السلاسل
    Activity, // اختبارات حركة متواصلة تحت الحمل لضمان ثبات السرعة
    HeartHandshake, // صيانة مخصصة لرافعات ومصاعد منصات أصحاب الهمم
  ],
}

/**
 * Contextual icons for equipment and systems covered under each service.
 */
const serviceEquipmentIcons: Record<ServiceKey, IconComponent[]> = {
  maintenance: [
    Building2, // مصاعد الركاب السكنية والبرجية
    Home, // المصاعد الهيدروليكية ومصاعد الفلل
    Truck, // مصاعد الحمولات والبضائع
    Activity, // مصاعد المستشفيات والأسرة
    Sparkles, // مصاعد ذوي الاحتياجات الخاصة والبانوراما
  ],
  modernization: [
    Clock, // المصاعد القديمة التي تجاوز عمرها التشغيلي 10 إلى 15 عاماً
    Droplets, // المصاعد الهيدروليكية التي تعاني من بطء الحركة أو استهلاك الزيت
    Building2, // مصاعد الأبراج التجارية ذات حركة الركاب الكثيفة
    Cpu, // المصاعد السكنية التي تتكرر أعطال لوحات تحكمها التقليدية
  ],
  installation: [
    Maximize2, // مصاعد الركاب بدون غرفة محرك (MRL)
    Building2, // مصاعد الركاب بغرفة محرك علوية
    Home, // مصاعد الفلل الهيدروليكية ذات المساحات المحدودة
    Eye, // مصاعد البانوراما الزجاجية للمولات والمباني الفاخرة
    Package, // مصاعد الخدمة والبضائع للمستودعات والمطاعم
  ],
  spareParts: [
    Droplets, // قطع غيار المصاعد الهيدروليكية بمختلف سعاتها
    Zap, // قطع غيار مصاعد الجر الكهربائية العادية وذات السرعات العالية
    DoorClosed, // مكونات أبواب المصاعد الأوتوماتيكية والنص أوتوماتيكية
    ShieldAlert, // أجهزة السلامة والحساسات الضوئية والستائر الإلكترونية
  ],
  escalators: [
    ArrowUpDown, // السلالم المتحركة الداخلية في المراكز التجارية والمولات
    Building2, // السلالم المتحركة شديدة التحمل للمباني الخدمية ومحطات النقل
    MoveRight, // الممرات المتحركة الأفقية والمائلة للمطارات والأسواق الكبرى
    Accessibility, // رافعات ومصاعد منصات ذوي الاحتياجات الخاصة
  ],
}

const serviceProcessIcons: Record<ServiceKey, IconComponent[]> = {
  maintenance: [
    Search, // 01 الفحص الهندسي الشامل
    ClipboardCheck, // 02 إعداد التقرير التشغيلي
    Wrench, // 03 تنفيذ الصيانة الدورية
    Siren, // 04 الدعم الطارئ المستمر
  ],
  modernization: [
    Scan, // 01 تقييم الأنظمة الحالية
    Sliders, // 02 تحديد نطاق التحديث
    Cog, // 03 التوريد والتركيب المبرمج
    ShieldCheck, // 04 المعايرة واختبارات السلامة
  ],
  installation: [
    Compass, // 01 المعاينة الهندسية للموقع
    PackageCheck, // 02 التوريد والمطابقة
    Wrench, // 03 التركيب الميكانيكي والكهربائي
    Award, // 04 الفحص النهائي والتسليم
  ],
  spareParts: [
    Search, // 01 فحص وتحديد القطعة المطلوبة
    Truck, // 02 المطابقة والتأمين السريع
    Wrench, // 03 التركيب والمعايرة الفنية
    BadgeCheck, // 04 اختبار الأداء والضمان
  ],
  escalators: [
    Eye, // 01 الفحص البصري والميكانيكي
    ShieldAlert, // 02 اختبار مفاتيح الأمان والحساسات
    Droplets, // 03 التزييت والضبط الحركي
    Activity, // 04 الاختبار الديناميكي تحت الحمل
  ],
}

const processStepIcons: IconComponent[] = [
  Search, // 01 المعاينة والفحص الهندسي
  ClipboardCheck, // 02 إعداد التقرير والمطابقة
  Wrench, // 03 التنفيذ والتركيب والصيانة
  ShieldCheck, // 04 التسليم والاختبار والدعم
]

export const getServiceIncludedIcon = (
  serviceKey: ServiceKey,
  index: number,
): IconComponent => {
  const icons = serviceIncludedIcons[serviceKey]
  return icons && icons[index] ? icons[index] : ShieldCheck
}

export const getEquipmentIcon = (
  serviceKey: ServiceKey,
  index: number,
): IconComponent => {
  const icons = serviceEquipmentIcons[serviceKey]
  return icons && icons[index] ? icons[index] : Building2
}

export const getServiceProcessIcon = (
  serviceKey: ServiceKey,
  index: number,
): IconComponent => {
  const icons = serviceProcessIcons[serviceKey]
  return icons && icons[index] ? icons[index] : processStepIcons[index] || Wrench
}

export const getProcessStepIcon = (index: number): IconComponent => {
  return processStepIcons[index] || Wrench
}

