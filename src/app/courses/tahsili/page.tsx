
      {/* Added Student Reviews Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">💬 آراء الطلاب</h2>
        <p className="text-center text-muted-foreground mb-4">🌟 استمع إلى تجارب زملائك:
          هنا تجد قصص نجاح ملهمة من طلاب استفادوا من دوراتنا في التحصيلي وحققوا نتائج ممتازة. انضم إليهم وابدأ رحلتك نحو التفوق!</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentReviews.map((review, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i + review.rating} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.review}"</p>
                <p className="font-semibold text-sm text-right">- {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
