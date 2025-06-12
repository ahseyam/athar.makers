<>
      <section className="mb-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">🔍 مميزات البرنامج التدريبي</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "اختبار تشخيصي قبل البداية لتحديد المستوى",
            "خطة تدريبية شخصية بناءً على نتيجة التشخيص",
            "محتوى تفاعلي عالي الجودة (عربي + رموز بصرية)",
            "أنشطة تطبيقية وتمارين تدرّجية",
            "اختبارات مصغّرة بعد كل محور",
            "تقرير تحليلي مخصص لكل طالب",
            "شهادة إتمام إلكترونية باعتماد المنصة",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3 space-x-reverse">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-4">🤝 رحلة مشتركة: الطالب وولي الأمر</h2>
        <p  className="text-center text-muted-foreground mb-6">ندرك أن رحلة الاستعداد لمقياس موهبة هي جهد مشترك بين الطالب وأسرته. لذا، تم تصميم برامجنا لتوفر الشفافية الكاملة لولي الأمر حول تقدم ابنه أو ابنته، مع تزويده بتقارير تحليلية واضحة تساعده على فهم نقاط القوة ومجالات التطوير، وتقديم الدعم المناسب في هذه المرحلة الهامة. نحن هنا لنمكّن كلاً من الطالب وولي الأمر لتحقيق أفضل النتائج.</p>
      </section>
</>
